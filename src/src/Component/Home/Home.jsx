import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Typed from 'typed.js';
import duiImage from '/dui.png';
import dashboard3Image from '/dashboard3.png';
import resourceImage from '/resource.jpg';
import taskImage from '/task.jpg';

function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check for currentUserName in localStorage
    const storedUser = localStorage.getItem('currentUserName');
    setCurrentUser(storedUser);

    // Initialize Typed.js
    new Typed('#element', {
      strings: [
        'Personalize Dashboard',
        'Manage Resources',
        'Collaborate Seamlessly',
        'Track Task',
      ],
      typeSpeed: 50,
    });
  }, []);


  return (
    <>
      <header>
        <nav className="nx">
          <div className="logo">
            <p>TaskTalk</p>
          </div>
          <ul className="navi">
            <li><a href="#home">Home</a></li>
            <li><a href="#second">About</a></li>
            <li><a href="#third">Service</a></li>
            <li><a href="#fourth">Activities</a></li>
            <li><a href="#five">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="full">
          <div className="left">
            <div className="part">
              <h2>
                TaskTalk:{' '}
                <span className="a">
                  Collaborative Task Management<br />
                </span>{' '}
                with chat <br />
                <span className="a">
                  <span id="element"></span>
                </span>
              </h2>

              {currentUser && (
                <button className="btn">
                <Link to="/dashboard">
                  My Dashboard
                </Link>
                </button>
              )}
              {!currentUser && (
                <button className="btn">
                  <Link to='/registration'>Get Started</Link>
                </button>
              )}
            </div>
          </div>
          <div className="right">
            <img src={duiImage} alt="TaskTalk" />
          </div>
        </section>

        <section id="third">
          <h1>Services TaskTalk will provide</h1>
          <div className="w">
            <div className="circle3"></div>
            <div className="circle4"></div>

            <div className="x">
              <i className="fa-solid fa-list-check"></i>
              <h2>Eliminate Manual Task</h2>
              <p>
                Automate routine tasks so you can focus on work that matters.
                Prioritize tasks, set due dates, and check status at a glance.
                It will give a bird's-eye view.
              </p>
            </div>
            <div className="x">
              <i className="fa-solid fa-comments"></i>
              <h2>Collaborate with your team, seamlessly</h2>
              <p>
                Assign tasks, collaborate and notify your teammates on status
                changes - all in real-time. Close the feedback loop, faster.
              </p>
            </div>
            <div className="x">
              <i className="fa-solid fa-diagram-project"></i>
              <h2>Transform your task list into a unique workflow</h2>
              <p>
                With customizable workflows, dashboards, processes, and
                automations, you can manage your work the way you want.
              </p>
            </div>
          </div>
        </section>

        <section id="fourth">
          <div className="container">
            <h1>Your Activities</h1>
            <div className="worklist">
              <div className="work">
                <img src={dashboard3Image} alt="Dashboard" />
                <div className="layer">
                  <h3>Create your own dashboard and join others</h3>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </div>
              <div className="work">
                <img src={resourceImage} alt="Resources" />
                <div className="layer">
                  <h3>Get your resources together</h3>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </div>
              <div className="work">
                <img src={taskImage} alt="Tasks" />
                <div className="layer">
                  <h3>Find pending tasks at a time</h3>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="second">
          <div className="fully">
            <div className="righty">
              <h1>
                Whether you're managing personal projects or collaborating with
                colleagues, TaskTalk brings all the tools you need into one
                seamless platform, empowering you to stay organized and
                productive. With TaskTalk, you can design and personalize your
                own intuitive dashboard, creating a workspace that aligns
                perfectly with your workflow. Tailor it to highlight your
                priorities, deadlines, or project milestones, giving you a clear
                overview of what matters most.
              </h1>
              <hr />
              <div className="circle6"></div>
            </div>
            <div className="lefty">
              <h1>
                TaskTalk isn’t just a tool—it’s your partner in productivity.
                Start using TaskTalk today and discover a smarter, more
                efficient way to work.
              </h1>
              <div className="circle7"></div>
            </div>
          </div>
        </section>

        <div id="five">
          <div className="last">
            <div className="last-left">
              <h1>Contact us</h1>
              <div className="tg">
                <i className="fa-brands fa-telegram"></i>
                <p>contact@example.com</p>
              </div>
              <div className="call">
                <i className="fa-solid fa-phone"></i>
                <p>0123456789</p>
              </div>
              <div className="icon">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-linkedin"></i>
              </div>
            </div>
            <div className="last-right">
              <form>
                <input type="text" name="name" placeholder="Your name" />
                <input type="email" name="email" placeholder="Your email" />
                <textarea
                  name="message"
                  placeholder="Your message"
                  rows="6"
                ></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer>
        Copyright @ Life Love Live{' '}
        <i className="fa-thin fa-diamonds-4"></i>
      </footer>
    </>
  );
};


export default Home;
