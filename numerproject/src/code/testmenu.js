// import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import { useState } from 'react';
// import {Link} from 'react-router-dom'
// import Bisection from './rootEquation/bisection';
// const { Header, Content, Footer, Sider } = Layout;
// // const link=(link)=>{
// //     return(
// //         <Link to='<Bisection/>'
// //     )
// // }
// function getItem(label, key, link, children) {
//     return {
//         key,
//         link,
//         children,
//         label,
//     };
// }
// const items = [
//     getItem('Root of Equation', '1', <PieChartOutlined />,[
//         getItem('Bisection','2'),
//         getItem('False Position','3'),
//     ]),
//     // getItem('Option 2', '2', <DesktopOutlined />),
//     // getItem('User', 'sub1', <UserOutlined />, [
//     //     getItem('Tom', '3'),
//     //     getItem('Bill', '4'),
//     //     getItem('Alex', '5'),
//     // ]),
//     // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//     // getItem('Files', '9', <FileOutlined />),
// ];
// const TestMenu = () => {
//     const [collapsed, setCollapsed] = useState(false);
//     const {
//         token: { colorBgContainer },
//     } = theme.useToken();
//     return (
//         <Layout
//             style={{
//                 minHeight: '100vh',
//             }}
//         >
//             <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
//                 <div
//                     style={{
//                         height: 60,
//                         background: 'rgba(255, 255, 255, 0.2)',
//                         textAlign:'center'
//                     }}
//                 >NUMERICAL METHOD
//                     </div>
//                 <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
//             </Sider>
//             <Layout className="site-layout">
//                 {/* <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         /> */}
//                 <Content
//                     style={{
//                         margin: '0 16px',
//                     }}
//                 >
//                     {/* <Breadcrumb
//             style={{
//               margin: '16px 0',
//             }}
//           >
//             <Breadcrumb.Item>User</Breadcrumb.Item>
//             <Breadcrumb.Item>Bill</Breadcrumb.Item>
//           </Breadcrumb> */}
//                     {/* <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//               background: colorBgContainer,
//             }}
//           >
//             Bill is a cat.
//           </div> */}
//                 </Content>
//                 {/* <Footer
//                     style={{
//                         textAlign: 'center',
//                     }}
//                 >
//                     Ant Design ©2023 Created by Ant UED
//                 </Footer> */}
//             </Layout>
//         </Layout>
//     );
// };
// export default TestMenu;

import { Box, NavLink } from '@mantine/core';
import Bisection from './rootEquation/bisection';
// import { IconGauge, IconFingerprint } from '@tabler/icons-react';

function TestMenu() {
    return (
        <Box w={240}>
            <NavLink
                label="First parent link"
                childrenOffset={28}
            >
                <NavLink label="First child link" onChange={<Bisection/>}/>
                <NavLink label="Second child link" />
                <NavLink label="Nested parent link" childrenOffset={28}>
                    <NavLink label="First child link" />
                    <NavLink label="Second child link" />
                    <NavLink label="Third child link" />
                </NavLink>
            </NavLink>

            <NavLink
                label="Second parent link"

                childrenOffset={28}
                defaultOpened
            >
                <NavLink label="First child link" />
                <NavLink label="Second child link" />
                <NavLink label="Third child link" />
            </NavLink>
        </Box>
    );
}
export default TestMenu