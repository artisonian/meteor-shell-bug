Meteor Shell Bug
================

In **Meteor 1.0.4.x**, `meteor shell` causes Underscore to break.

## To Reproduce This Issue

```bash
git clone https://github.com/artisonian/meteor-shell-bug.git
cd meteor-shell-bug
meteor
```

Click the button a few times. In the browser's console, you will see the output
of a Meteor method.

Then run `meteor shell`:

```bash
meteor shell
```

In the prompt, type `_` (which overwrites Underscore globally). Back in the
browser, click the button again. `_.ensure` will break on the server
(causing the Meteor method to error).
