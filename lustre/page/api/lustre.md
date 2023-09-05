# lustre

## Applications

### App | erlang javascript

```gleam
pub type App(flags, model, msg)
```

The `App` type typically represents all the parts that make up a Lustre program
in the Model-View-Update architecture, along with the runtime necessary to run
it.

Although the type itself is exposed to both the Erlang and JavaScript targets,
the functions in this module to construct an `App` are only available in the
JavaScript target, and `start` will only succeed when ran in the browser.

### Error | erlang javascript

```gleam
pub type Error {
  AppAlreadyStarted
  AppNotYetStarted
  BadComponentName
  ComponentAlreadyRegistered
  ElementNotFound
  NotABrowser
}
```

### element | javascript

```gleam
pub fn element(el: Element(msg)) -> App(Nil, Nil, msg)
```

An `element` application is the simplest kind of Lustre program. It takes an
`Element` to render and renders it to the DOM. These applications hold no state
and do not respond to messages, but that doesn't mean they are not interactive!

It is possible for [`components`](#component) to be rendered inside an
`element` application, and these components can be interactive with their own
contained state and update loops.

### simple | javascript

```gleam
pub fn simple(
  init: fn(flags) -> model,
  update: fn(model, msg) -> model,
  view: fn(model) -> Element(msg)
) -> App(flags, model, msg)
```

A `simple` program introduces the Model-View-Update architecture but leaves out
the ability to dispatch side effects. This means your programs are interactive
but cannot talk to the outside world.

### application | javascript

```gleam
pub fn application(
  init: fn(flags) -> #(model, Effect(msg)),
  update: fn(model, msg) -> #(model, Effect(msg)),
  view: fn(model) -> Element(msg)
) -> App(flags, model, msg)
```

The `application` constructor is the most complete way to build a Lustre app. As
with [`simple`](#simple) it uses the Model-View-Update architecture, but now your
init and update functions can return side effects to be performed by the runtime
in the form of an [`Effect`](/api/lustre/effect#effect-type).

### start | javascript

```gleam
pub fn start(
  app: App(flags, model, msg),
  selector: String,
  flags: flags,
) -> Result(fn(msg) -> Nil, Error)
```

Start an application by providing a CSS selector to find the element to mount the
application onto and any flags to pass to the application on first init. This
function returns a `Result` and may fail for a number of reasons. Check out the
[`Error`](#error-type) type for more information.

### destroy | javascript

```gleam
pub fn destroy(app: App(flags, model, msg)) -> Result(Nil, Error)
```

Tear down a running application and remove it from the DOM. This can fail if the
application has not yet been started.

## Components

Components take the same Model-View-Update building blocks used to create Lustre
programs and allow them to be used as reusable stateful components in other
programs. A component in Lustre means something much more specific than other
communities and frameworks. In those spaces, a "component" often refers to anything
 

### component | javascript

```gleam
pub fn component(
  name: String,
  init: fn() -> #(model, Effect(msg)),
  update: fn(model, msg) -> #(model, Effect(msg)),
  view: fn(model) -> Element(msg),
  on_attribute_change: Map(String, Decoder(msg)),
) -> Result(Nil, Error)
```

Register a component with the runtime from the familiar Model-View-Update building
blocks. Compared to an application, we have two additional arguments:

- A name for the component. This name must follow the same rules laid out in the
  [custom element spec](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)
  and should contain a hyphen (`-`) to avoid clashes with built-in HTML elements.
- A map of attribute names to listen for changes to and a decoder for each to
  decode those attributes into messages to send to your component's `update`
  function.

If it feels like the API for registering components is a little more verbose than
you're used to, that's because it is! You can get surprisingly far storing state
in your top level application and passing it down to different view functions
without needing to use components at all. In fact, for communities like Elm this
is the _only_ way to do things.

## Utilities

### is_browser | erlang javascript

```gleam
pub fn is_browser() -> Bool
```

### is_registered | erlang javascript

```gleam
pub fn is_registered(_name: String) -> Bool
```