export const appDetails = {
  id: 1,
  name: "iOS - Sunset app",
  connected: false,
  record: false,
  replay: false,
  activeProfileId: 1,
  profiles: [
    {
      id: 1,
      name: "User John",
    },
    {
      id: 2,
      name: "User Pro Bill",
    },
    {
      id: 2,
      name: "User no data",
    },
    {
      id: 3,
      name: "User a lot of data",
    },
  ],
};

export const logDetails = [
  {
    id: 1,
    method: "GET",
    code: 200,
    path: "/v1/posts",
    url: "https://www.box.com/v1/posts?=id=1",
  },
  {
    id: 2,
    method: "GET",
    code: 200,
    path: "/v1/posts",
    url: "https://www.box.com/v1/posts?=id=2",
  },
];

export const logItemDetails = {
  1: {
    id: 1,
    method: "GET",
    code: 200,
    path: "/v1/posts",
    url: "https://www.box.com/v1/posts?=id=1",
    request: {
      headers: "",
      body: "",
    },
    response: {
      headers: "",
      body: "",
    },
  },
  2: {
    id: 2,
    method: "GET",
    code: 200,
    path: "/v1/posts",
    url: "https://www.box.com/v1/posts?=id=2",
    request: {
      headers: "",
      body: "",
    },
    response: {
      headers: "",
      body: "",
    },
  },
};
