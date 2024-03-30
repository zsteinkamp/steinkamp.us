interface StravaRouteArgs {
  routeSrc: string
  className: string
}
const StravaRoute: React.FC<StravaRouteArgs> = ({ className, routeSrc }) => {
  // https://www.strava.com/routes/3197610976988007380
  // https://strava-embeds.com/route/3197610976988007380?style=standard&amp;fromEmbed=false#mapHash=13.9/36.99726/-121.91863
  const routeSrcMatches = routeSrc.match(/\d{6,}/)
  let embedSrc = null

  if (routeSrcMatches) {
    const routeId = routeSrcMatches[0]
    if (routeId) {
      embedSrc = `https://strava-embeds.com/route/${routeId}?style=standard&amp;fromEmbed=false`
    }
  }

  if (!embedSrc) {
    return <div><em>Invalid route ID in [{routeSrc}]</em></div>
  }

  return (
    <div className={className}>
      <iframe src={embedSrc} className="w-full my-4 mx-0 min-h-[40rem]" />
    </div>
  )
}

export { StravaRoute }