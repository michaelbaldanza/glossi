export default function Icon(props) {
  /* Set shared classes for icon images.
    Icons are square and have the 'toe-img' class.
    The dimensions accord with Merriam-Webster's brand guidelines, where 50x50 is the minimum size allowed. For more info visit:
    https://dictionaryapi.com/info/branding-guidelines
  */
  const commons = { height: '50', width: '50', className: 'toe-img' };
  /* Set icon objects. */
  const icons = {
    gh:{ 
      image: <svg xmlns="http://www.w3.org/2000/svg" {...commons} fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>,
      link: 'https://github.com/michaelbaldanza/glossi',
      title: 'GitHub repo',
    },
    li: {
      image: <svg xmlns="http://www.w3.org/2000/svg" {...commons} fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
      </svg>,
      link: 'https://www.linkedin.com/in/michael-baldanza/',
      title: 'LinkedIn',
    },
    mw: {
      image: <img src="mw120x120.png" {...commons}></img>,
      link: 'https://dictionaryapi.com/products/api-collegiate-dictionary',
      title: "Merriam-Webster's Collegiate Dictionary with Audio API",
    },
    wikt: {
      image: <svg xmlns="http://www.w3.org/2000/svg" {...commons} fill="currentColor"><path d="M27.128 40.29c7.417-1.054 13.12-7.418 13.12-15.145a15.19 15.19 0 0 0-5.434-11.674l-7.707 7.707v19.111h.021zm-4.318 0V21.177l-7.707-7.707c-3.326 2.81-5.434 7.004-5.434 11.674.021 7.706 5.724 14.09 13.14 15.144z"/><path d="M38.264 11.86c3.554 3.553 5.496 8.264 5.496 13.285 0 5.02-1.962 9.731-5.496 13.285-3.553 3.553-8.264 5.496-13.285 5.496-5.02 0-9.731-1.963-13.285-5.496-3.554-3.533-5.496-8.265-5.496-13.285 0-5.021 1.963-9.732 5.496-13.285.31-.31.62-.6.93-.868L8.326 6.694c-.31.29-.62.579-.93.889a25 25 0 0 0-5.33 7.892 24.59 24.59 0 0 0-1.963 9.67c0 3.347.661 6.611 1.963 9.669 1.26 2.955 3.037 5.62 5.33 7.893a25 25 0 0 0 7.893 5.33A24.59 24.59 0 0 0 24.96 50a24.59 24.59 0 0 0 9.67-1.963c2.954-1.26 5.619-3.037 7.892-5.33a25 25 0 0 0 5.33-7.893 24.59 24.59 0 0 0 1.963-9.67 24.59 24.59 0 0 0-1.963-9.669c-1.26-2.954-3.037-5.62-5.33-7.892-.31-.31-.62-.6-.93-.889l-4.298 4.298a9.7 9.7 0 0 1 .971.868z"/><circle cx="24.979" cy="7.913" r="7.748"/></svg>,
      link: 'https://en.wiktionary.org/api/rest_v1/#/',
      title: 'Wikimedia REST API',
    },
  }

  const abbr = props.abbr;
  const icon = icons[abbr];

  return (
    /* Set Icon classes.
      The `:hover` pseudoselector on `.toe-image` modifies the `svg` element's
      `fill` property. The `svg-wrapper` class is just semantic, while
      `.png-wrapper` modifies the `div` `border-radius` and `box-shadow`
      properties. This does well in a pinch. Although the visual effect is
      inconsistent, it gets around `png` not having a `fill` property and it
      avoids the complication of overlaying a `div`.
    */
    <div className={`icon-wrapper ${abbr === 'mw' ? 'png-wrapper' : 'svg-wrapper'}`}>
      <a href={icon.link} title={icon.title}>
        {icon.image}
      </a>
    </div>
  );
}