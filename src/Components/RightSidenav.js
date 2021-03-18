import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
 import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import PeopleButton from '../util/PeopleButton';
import { Link } from 'react-router-dom';



const RightSidenav = () => {

    const user = useSelector(state => state.users);

    useEffect(() => {
      document.addEventListener('mousedown', clickOutside);
      return () => {
        document.removeEventListener('mousedown', clickOutside);
      }
    }, [])

    const clickOutside = (e) => {
      const {current: wrap} = myRef;
      if(wrap && !wrap.contains(e.target)){
        setDisplay(false);
      }
    }

    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState('');
    const myRef = useRef();

    const setUser = (user) => {
      setSearch(search);
      setDisplay(true);
    }


    return (
      <div ref={myRef}>
      <div className="s-side">
      <div className="second-side">
        <div className="search">
          <SearchOutlined />
          <input onClick={() => setDisplay(!display)} 
          className="input-search" 
          placeholder="Search banters"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        </div>
        <div className="trends">
        <div className="pymn"></div>
        {display && (
          <div>
          {user && 
          user.users.filter(({name, handle}) => handle.indexOf(search.toLowerCase()) > -1
          || name.toLowerCase().indexOf(search.toLowerCase()) > -1
          )
          .map(user => (
          <div id="dove" key={user._id} onClick={() => setUser(user.name)}>
            {}
           <div>
            <Avatar size={50} src='/images/no-img.png'/>
            </div>
           <div id="nn">
           <Link to={`/profile?handle=${user.handle}`}>
           <span id="oo">{user.name}</span><br/>
            <span id="os">@{user.handle}</span>
            </Link>
           </div>
           <div>
           <PeopleButton handle={user.handle}/>
           </div>
           </div>
        ))}
          </div>
        )}
        </div>
      </div>
      <div className="trendss">
        <div className="pymn">
        <span className="menus"><UserOutlined /> TRENDS FOR YOU</span>
        </div>
      </div>
      </div>
    </div>
    );
}

export default RightSidenav;