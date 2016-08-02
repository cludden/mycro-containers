# mycro-containers
[mycro]() hook for loading local modules onto the application instance.



## Installing
```bash
npm install --save mycro-containers
```


## Configuration
```javascript
// in /config/containers.js
module.exports = {
    connections: true,
    controllers: true,
    models: true,
    policies: true,
    services: true,
    schemas: {
        filter:  /(.+)\.json$/,
    }
}
```


## Testing
```bash
npm test
```



## Contributing
1. [Fork it](https://github.com/cludden/mycro/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request



## License
Copyright (c) 2016 Chris Ludden.
Licensed under the [MIT license](LICENSE.md).
