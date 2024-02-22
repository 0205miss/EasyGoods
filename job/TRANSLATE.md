## Job description

Let EasyGoods to the world, we need everyone help us translate the text, so people can easily read and use our app

## Follow the step to contribute

### Create or Edit transcript under [src/transcript](https://github.com/0205miss/EasyGoods/src/transcript)

You should know that the file name should be formatted by ISO 639-1

### If create a new transcript

####  Add following to [src/lib/dictionary.js](https://github.com/0205miss/EasyGoods/src/lib/dictionary.js)

```
'ISO 639-1': () => import('@/transcript/(ISO 639-1).json').then((module) => module.default)
```

####  Add following to [src/transcript/list.js](https://github.com/0205miss/EasyGoods/src/lib/dictionary.js)

```
"ISO 639-1": "Your language native name"
```

## Submit your work by creating pull request