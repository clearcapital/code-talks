const h2 = document.querySelector('.h2')
const pre = document.querySelector('.code')

function test1 () {
  h2.innerHTML = 'Object Reference<br><span class="fail">fail</span>'

  const plop = { foo: true }
  const zing = plop

  pre.innerHTML =
`
const plop = { foo: true }
const zing = plop

(plop === zing) // ${plop === zing}
`
}

function test2 () {
  h2.innerHTML = 'Spread Operator<br><span class="pass">Pass</span>'
  const plop = { foo: true }
  const zing = { ...plop }

  pre.innerHTML =
`
const plop = { foo: true }
const zing = { ...plop }

(plop === zing) // ${plop === zing}
`
}

function test3_F () {
  h2.innerHTML = 'Spread Operator: Nested Object<br><span class="fail">fail</span>'
  const plop = {
    foo: true,
    bar: {
      wiz: false
    }
  }

  const zing = { ...plop }
  zing.foo = 100

  plop.bar.wiz = true

  pre.innerHTML =
`
const plop = {
  foo: true,
  bar: {
    wiz: false
  }
}

const zing = { ...plop }

plop.bar.wiz = true

plop // ${JSON.stringify(plop, null, 2)}

zing // ${JSON.stringify(zing, null, 2)}

(plop === zing) // ${plop === zing}
(plop.bar === zing.bar) // ${plop.bar === zing.bar}
`
}

function test3_P () {
  h2.innerHTML = 'Spread Operator: Nested Object<br><span class="pass">Pass</span>'
  const plop = {
    foo: true,
    bar: {
      wiz: false
    }
  }

  const zing = {
    ...plop,
    bar: {
      ...plop.bar
    }
  }

  zing.foo = 100

  plop.bar.wiz = true

  pre.innerHTML =
`
const plop = {
  foo: true,
  bar: {
    wiz: false
  }
}

const zing = {
  ...plop,
  bar: {
    ...plop.bar
  }
}

plop.bar.wiz = true

plop // ${JSON.stringify(plop, null, 2)}

zing // ${JSON.stringify(zing, null, 2)}

(plop === zing) // ${plop === zing}
(plop.bar === zing.bar) // ${plop.bar === zing.bar}
`
}

function test4_F () {
  h2.innerHTML = 'Object assign: Nested Object<br><span class="fail">fail</span>'
  const plop = {
    foo: true,
    bar: {
      wiz: false
    }
  }

  const zing = Object.assign({}, plop)
  zing.foo = 100

  plop.bar.wiz = true

  pre.innerHTML =
`
const plop = {
  foo: true,
  bar: {
    wiz: false
  }
}

const zing = Object.assign({}, plop)
zing.foo = 100

plop.bar.wiz = true

plop // ${JSON.stringify(plop, null, 2)}

zing // ${JSON.stringify(zing, null, 2)}

(plop === zing) // ${plop === zing}
(plop.bar === zing.bar) // ${plop.bar === zing.bar}
`
}

function test4_P () {
  h2.innerHTML = 'Object assign: Nested Object<br><span class="pass">pass</span>'
  const plop = {
    foo: true,
    bar: {
      wiz: false
    }
  }

  const zing = Object.assign({}, plop, {
    bar: Object.assign({}, plop.bar)
  })

  plop.bar.wiz = true

  pre.innerHTML =
`
const plop = {
  foo: true,
  bar: {
    wiz: false
  }
}

const zing = Object.assign({}, plop, {
  bar: Object.assign({}, plop.bar)
})

plop.bar.wiz = true


plop // ${JSON.stringify(plop, null, 2)}

zing // ${JSON.stringify(zing, null, 2)}

(plop === zing) // ${plop === zing}
(plop.bar === zing.bar) // ${plop.bar === zing.bar}
`
}

// Example of writing a deepClone function
var js = {
  isCool: true,
  isLame: false,
  about: {
    creationDate: 'May 1995',
    createdBy: 'Brendan Eich'
  },
  frameworks: [
    'angular',
    'react',
    { name: 'vue' }
  ]
}

function deepClone (thing) {
  if (thing.constructor === Array) {
    return arrayCloner(thing)
  } else if (thing.constructor === Object) {
    return objCloner(thing)
  } else {
    return thing
  }
}

function arrayCloner (arrayToClone) {
  return arrayToClone.map((item) => {
    if (item.constructor === Array) {
      return arrayCloner(item)
    } else if (item.constructor === Object) {
      return objCloner(item)
    } else {
      return item
    }
  })
}

function objCloner (objToClone) {
  const cloned = {}

  Object.keys(objToClone).forEach((key) => {
    const val = objToClone[key]

    if (val.constructor === Array) {
      cloned[key] = arrayCloner(val)
    } else if (val.constructor === Object) {
      cloned[key] = objCloner(val)
    } else {
      cloned[key] = val
    }
  })

  return cloned
}

function jlog (item) {
    console.log(JSON.stringify(item, null, 2))
}
