import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import ChatRoom from "./pages/ChatRoom";
import CreateRoom from "./pages/CreateRoom";
import AllOpenedChats from "./pages/AllOpenedChats";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/allopenedchats",
    element: <AllOpenedChats />,
  },
  {
    path: "/create-link",
    element: <CreateRoom />,
  },
  {
    path: "/room/:id",
    element: <ChatRoom />,
  },
]);
