"# Ecom_Backend"

`Get Cookie`

```js
const token = req.cookie.authToken;
```

`Set Cookie`

```js
res.cookie("authToken", token, {
  httpOnly: true,
  maxAge: 60 * 60 * 5 * 1000,
});
```

`Delete Cookie`

```js
res.clearCookie("authToken", {
  httpOnly: true,
  maxAge: 60 * 60 * 5 * 1000,
});
```
