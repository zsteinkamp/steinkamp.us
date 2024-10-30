import { categoryZipPath } from '@/util/downloadUtils'
import yaml from 'js-yaml'
import fs from 'fs'
import { Octokit } from '@octokit/rest'
import AdmZip from 'adm-zip'
import path from 'path'
import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const buildZips = async () => {
  const octokit = new Octokit({ auth: process.env['GH_TOKEN'] })

  const tools: any = yaml.load(fs.readFileSync('data/music-tools.yaml', 'utf8'))

  const categoryZips: Record<string, AdmZip> = {}

  //console.log("OUT HERE UP")

  for (const app of tools) {
    const repo = app.link.split('/')[4]
    if (!repo) {
      console.error(`repo not found for ${app.link}`)
      continue
    }
    const { data } = await octokit.rest.repos.listReleases({ owner: 'zsteinkamp', repo })
    const release = data[0]
    //console.log(data[0])
    if (!release) {
      console.error(`no release for ${repo}`)
      continue
    }
    for (const asset of release.assets) {
      let zip = categoryZips[app.category]
      if (!zip) {
        //console.log(`adding ${app.category}`)
        categoryZips[app.category] = new AdmZip()
        zip = categoryZips[app.category]
      }
      const assetUrl = new URL(asset.browser_download_url)
      const assetFname = path.basename(assetUrl.pathname)
      const contentsResp = await fetch(assetUrl)
      zip.addFile(assetFname, Buffer.from(await contentsResp.arrayBuffer()))
      console.log(`added file ${assetFname} to ${app.category}`)
    }
  }

  //console.log("OUT HERE DOWN")

  for (const cat in categoryZips) {
    const zipFilename = path.join('public', categoryZipPath(cat))
    categoryZips[cat].writeZip(zipFilename)
    console.log(`wrote ${zipFilename}`)
  }
}

buildZips()
