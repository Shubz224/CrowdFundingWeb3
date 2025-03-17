import { createCampaign, dashboard, logout, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'admin',
    imgUrl: withdraw,
    link: '/admin',
  
  },
  //{
  //  name: 'withdraw',
  //  imgUrl: withdraw,
  //  link: '/',
  //  disabled: true,
  //},
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: false,
  },
];