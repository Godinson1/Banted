import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Avatar } from 'antd';
 import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import PeopleButton from '../util/PeopleButton';
import { Link } from 'react-router-dom';



const RightSidenav = () => {

    const user = useSelector(state => state.users);

    let result; 
    if(user && user.following && user.users) {
      result = user.users.filter(us => user.following.some(follow => us.handle !== follow.handle));
      console.log(result);
    }


    return (
        <div>
            <Layout>
      <div className="s-side">
      <div className="second-side">
        <div className="search">
        <SearchOutlined /><input className="input-search" placeholder="Search banters"/>
        </div>
        <div className="trends">
        <div className="pymn">
        <span className="menus"><UserOutlined /> OTHER BANTERS</span>
        </div>
        {result && result.map(user => (
          <div id="dove" key={user._id}>
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
      </div>
      <div className="trendss">
        <div className="pymn">
        <span className="menus"><UserOutlined /> TRENDS FOR YOU</span>
        </div>
      </div>
      </div>
      </Layout>
    </div>
    );
}

export default RightSidenav;