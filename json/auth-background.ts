export type AuthBackgroundItem = {
  author: {
    name: string;
    link: string;
  };
  origin: string;
  url: {
    origin: string;
    large?: string;
    tiny: string; // width: 256px
  };
};

export const AuthBackgrounds: AuthBackgroundItem[] = [
  {
    author: {
      name: "Emil Widlund",
      link: "https://unsplash.com/@emilwidlund",
    },
    origin:
      "https://unsplash.com/photos/white-and-gray-wooden-apartment-houses-qWdei6yHNnA",
    url: {
      origin:
        "https://telegraph-image-bak.pages.dev/file/ee5c2878cf301e5cb7db1.jpg",
      large:
        "https://telegraph-image-bak.pages.dev/file/2fb22ed821c845d067d06.jpg",
      tiny: "https://telegraph-image-bak.pages.dev/file/f9076a73b5a4a65573005.jpg",
    },
  },
  {
    author: {
      name: "Einar Storsul",
      link: "https://unsplash.com/@einarstorsul",
    },
    origin:
      "https://unsplash.com/photos/a-group-of-buildings-that-are-next-to-a-body-of-water-7SXxGG5eCuY",
    url: {
      origin:
        "https://telegraph-image-bak.pages.dev/file/ac68e080ecdeb2f198a19.jpg",
      tiny: "https://telegraph-image-bak.pages.dev/file/f898fe62e396ae5ed951c.jpg",
    },
  },
  {
    author: {
      name: "Christina Brinza",
      link: "https://unsplash.com/@cbrin",
    },
    origin:
      "https://unsplash.com/photos/a-small-black-and-white-bird-perched-on-a-tree-branch-LZ2FIsUxgFU",
    url: {
      origin:
        "https://telegraph-image-bak.pages.dev/file/5f854b6a7b00df508893f.jpg",
      tiny: "https://telegraph-image-bak.pages.dev/file/68a4e14da6e9e796ef474.jpg",
    },
  },
  {
    author: {
      name: "Samuel Ferrara",
      link: "https://unsplash.com/@samferrara",
    },
    origin:
      "https://unsplash.com/photos/forest-near-glacier-mountain-during-day-dKJXkKCF2D8",
    url: {
      origin:
        "https://telegraph-image-bak.pages.dev/file/04454dffc9f8c1f14d602.jpg",
      tiny: "https://telegraph-image-bak.pages.dev/file/692d4078f1e512216ef1a.jpg",
    },
  },
  {
    author: {
      name: "Thomas Griesbeck",
      link: "https://unsplash.com/@jack_scorner",
    },
    origin:
      "https://unsplash.com/photos/silhouette-of-pine-trees-photo-BS-Uxe8wU5Y",
    url: {
      origin:
        "https://telegraph-image-bak.pages.dev/file/a26585bfeca4261fe0e7f.jpg",
      tiny: "https://telegraph-image-bak.pages.dev/file/509d26de1d38afebacc98.jpg",
    },
  },
  {
    author: {
      name: "HKTreks",
      link: "https://unsplash.com/@hktreks",
    },
    origin:
      "https://unsplash.com/photos/foggy-mountain-during-daytime-ima2rtH8rr4",
    url: {
      origin:
        "https://telegraph-image-bak.pages.dev/file/c47eaae6fb467b28cfb24.jpg",
      tiny: "https://telegraph-image-bak.pages.dev/file/121486488a3ed35940a27.jpg",
    },
  },
  // {
  //   author: {
  //     name: "",
  //     link: "",
  //   },
  //   origin: "",
  //   url: {
  //     origin: "",
  //     tiny: "",
  //   },
  // },
];
