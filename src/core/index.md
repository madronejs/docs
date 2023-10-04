---
outline: deep
---

# MadroneJS core

Madrone is an easy way to make reactive objects in JS.

## Basics

MadroneJS has 3 basic concepts:

1. `reactive` properties: something that will be tracked when it is retrieved or set
2. `computed` properties: a getter property that will only re-evaluate when its reactive dependencies change
3. `watch`: something that can watch changes that happen to reactive or computed properties

These three ideas aren't particularly novel, and several other libraries implement ways to do this, such as [MobX](https://mobx.js.org/README.html) or [Vue](https://vuejs.org/guide/essentials/reactivity-fundamentals.html). While MadroneJS can be used on its own, it was originally written to provide an easy interface to integrate with other frameworks (namely Vue).

Using MadroneJS allows for the service layer of an application to take advantage of computed and reactive properties, but avoids tying the service layer to one particular view layer. This makes it possible to write the core service layer of an application or library once, and reuse that code in a Vue 2 application or a Vue 3 application while maintaining reactivity.

## Installation

::: code-group

```shell [pnpm]
pnpm add @madronejs/core
```

```shell [npm]
npm install @madronejs/core --save
```

```shell [yarn]
yarn add @madronejs/core
```

:::

## Setup

To get MadroneJS up and running, it needs to have an integration registered so it knows how to make the objects reactive. It does this through a combination of [defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) and using js [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

::: code-group

```typescript [vanilla]
import Madrone, { MadroneState } from '@madronejs/core';

Madrone.use(MadroneState);
```

```typescript [Vue 3]
import Madrone, { MadroneVue3 } from '@madronejs/core';
import { reactive, computed, watch, toRaw } from 'vue';

Madrone.use(MadroneVue3({
  reactive, computed, watch, toRaw,
}));
```

```typescript [Vue 2]
import Madrone, { MadroneVue2 } from '@madronejs/core';
import Vue from 'vue';

Madrone.use(MadroneVue2(Vue));
```

:::

## Usage

MadroneJS can be used with regular objects or it can be used with classes using decorators.

### Objects

You can use `auto` to quickly mark all properties as reactive, and all getters as computed/cached properties. `watch` can be used to observe changes.

```typescript
import { auto, watch } from '@madronejs/core';

const person = auto({
  name: 'Jim',
  get greeting() {
    return `Hi, I'm ${person.name}`
  },
});

const newVals = [];
const oldVals = [];

// Watch a reactive property when it changes. Any reactive property accessed
// in the first argument will cause the watcher callback to trigger. Anything
// returned from the first argument will define what the newVal/oldVal is.
watch(() => person.greeting, (newVal, oldVal) => {
  newVals.push(newVal);
  oldVals.push(oldVal);
});

person.name;      // Jim
person.greeting;  // Hi, I'm Jim

person.name = 'Not Jim';
person.greeting;  // Hi, I'm Not Jim

// watcher is async...
console.log('New Vals:', newVals); // ["Hi, I'm Not Jim"]
console.log('Old Vals:', oldVals); // ["Hi, I'm Jim"]
```

### Class decorators

Using decorators can make code more readable, and can give more control over which properties are marked as `reactive` and which getters are considered `computed` getters.

```typescript
import { computed, reactive } from '@madronejs/core'

class Person {
  @reactive name: string;
  @computed get greeting() {
    return `Hi, I'm ${this.name}`;
  }

  constructor(options: { name: string }) {
    this.name = options?.name;
  }
}
```