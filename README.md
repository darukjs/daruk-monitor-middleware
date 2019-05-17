### daruk-monitor-middleware

A monitor from v8-profiler-node8 for [Daruk](https://darukjs.github.io/daruk.org)

## Installation scaffolding

```bash

$ cnpm i -g daruk-monitor-middleware

```

## How to use in your daruk project

Find your daruk config file

```typescript
//daruk.config.ts
darukConfig.middleware = {
  'daruk-monitor-middleware': (mid: Function) => {
    return mid({
      auth: {
        name: 'monitor',
        password: 'monitor'
      }
    });
  }
};

//push it into the middleware list
darukConfig.middlewareOrder = ['daruk-monitor-middleware'];
```

## Your can view the data from Api:

### /monitor/profiler

### /monitor/profiler/function

### /monitor/profiler/mem

### /monitor/profiler/mem-analytics

## LICENSE

### MIT License
