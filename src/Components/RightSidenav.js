import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Button, Avatar } from 'antd';
 import { UserOutlined, HeartOutlined, HeartFilled, SearchOutlined } from '@ant-design/icons';
import FollowButton from '../util/FollowButton';



const RightSidenav = () => {

    const user = useSelector(state => state.users);
    //const dispatch = useDispatch();

    //const [visible, setVisible] = useState(false);


    return (
        <div>
            <Layout>
      <div className="s-side">
      <div className="second-side">
        <div className="search">
        <SearchOutlined /><input className="input-search" placeholder="Search banters"/>
        </div>
        <div className="trendss">
        <div className="pymn">
        <span className="menus"><UserOutlined /> TRENDS FOR YOU</span>
        </div>
        </div>
        <div className="trends">
        <div className="pymn">
        <span className="menus"><UserOutlined /> PEOPLE YOU MAY KNOW</span>
        </div>
        {user && user.users && user.users.map(user => (
          <div id="dove" key={user._id}>
           <div>
            <Avatar size={50} src='/images/no-img.png'/>
            </div>
           <div id="nn">
           <span id="oo">{user.name}</span><br/>
            <span id="os">@{user.handle}</span>
           </div>
           <div>
           <FollowButton handle={user.handle}/>
           </div>
           </div>
        ))}
        </div>
      </div>
      </div>
      </Layout>
    </div>
    );
}

export default RightSidenav;