# Pomodoro timer

A simple application for checking your time.

![Снимок-pom](https://user-images.githubusercontent.com/39487464/215758424-87f943bf-a7d2-43d7-8e9e-06e7926ed1b9.JPG)

### What was implemented

- timer: then time is up, an user will hear an alarm sound
- add zero if digits are less than 10
- avoid font jumping with page downloading:

_css @font-face:_

`...`<br>
`font-display: swap;`<br>
`...`

_html:_

`...`<br>
`<link rel="preload" href="fonts/lobster-v28-latin_cyrillic-regular.woff2" as="font" crossorigin>`<br>
`...`
