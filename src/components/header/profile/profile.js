import { UserAvatar } from '../../shared/icons/user-avatar'
import { UserArrow } from '../../shared/icons/user-arrow'
import css from './profile.module.scss'
import { useState } from 'react'

export const Profile = () => {
    const [isMenuShown, setIsMenuShown] = useState(false);

    return (
        
        <div className={css.profile}
             onClick={() => setIsMenuShown(!isMenuShown)}>
           
              {isMenuShown && <div className={css.menu}>
              <div>Profile</div>
              <div>Log Out</div>
              </div> 
             }
             <div className={css.avatar}><UserAvatar/></div>
             <div className={`${css.arrow} ${isMenuShown ? css.up : ""}`}><UserArrow/></div>
        </div>
        
    )
} 
             

              
                
              
            



