exports.get404 = (req, res, next) => {
  res
    .status(404)
    .render('404', { pageTitle: 'Page not found 404', docTitle: '404 not found', path: null });
};
