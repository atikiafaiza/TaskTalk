import React, { Component, useState } from 'react'

function Header(){
  const [value, setValue] = useState("default");

  return  (
  <header>
  <nav class="nx">
    <div class="logo">
      <p>TaskTalk</p>
    </div>     
      <ul class="navi">
        <li><a href="">Home</a></li>
        <li><a href="#second">About</a></li>
        <li><a href="#third">Service</a></li>
        <li><a href="#fourth">Activities</a></li>
        <li><a href="#five">Contact </a></li>
      </ul>     
  </nav>
</header>
  )
}

export default Header;
