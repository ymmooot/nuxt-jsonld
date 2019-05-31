export default ({ options }) => {
  if (!options.methods || !Object.prototype.hasOwnProperty.call(options.methods, 'jsonld')) {
    return;
  }

  options.jsonld = options.methods.jsonld;
  delete options.methods.jsonld;
};
