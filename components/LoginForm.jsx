/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Component(props) {
  return (
    <form id="loginForm" method="POST">
      <div class={tw`my-3`}>
        {/* <label class="">Username</label> */}
        <input class={tw`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} type="text" name="identifier" placeholder="Username" />
      </div>
      <div class={tw`my-3`}>
        {/* <label class="">Password</label> */}
        <input class={tw`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} type="password" name="password" placeholder="Password" />
      </div>
      <div class={tw``}>
        <button type="submit" class={tw`inline-block px-6 py-3 bg-blue-600 text-white font-medium text-md leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}>Login</button>
      </div>
    </form>
  );
}
