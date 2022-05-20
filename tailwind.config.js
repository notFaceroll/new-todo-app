module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "disc-dark-grey": "#2f3136",
        "disc-online-green": "#3da560",
        "disc-not-so-blurple": "#5866ef",
        "disc-idle-yellow": "#f9a62b",
        "disc-dnd-red": "#ec4145",
        "disc-grey": "#37393e",
        "disc-not-quite-black": "#23272a",
        "disc-greyple": "#99aab5",
        "disc-dark-not-black": "#2c2f33",
      },
      backgroundImage: {
        "hero-bg":
          "url(https://images.unsplash.com/photo-1650374638026-b680803bdb86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2138&q=80)",
      },
    },
  },
  plugins: [],
};
