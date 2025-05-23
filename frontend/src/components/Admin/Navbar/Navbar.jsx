import {assets} from '../../../assets/frontend_assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} />
        <img className='profile' src={assets.profile_image} />
    </div>
  )
}

export default Navbar