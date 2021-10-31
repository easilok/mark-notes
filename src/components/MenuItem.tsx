import React from 'react'

interface MenuItemProps {
  title: string
  iconify: boolean
  active: boolean
  onMenuClick: () => void
  icon: React.ReactElement
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { iconify, active } = props

  let menuClassNames = ''
  if (iconify) {
    menuClassNames += 'iconify '
  }
  if (active) {
    menuClassNames += 'active '
  }

  return (
    <div className={`menu-item ${menuClassNames}`} onClick={props.onMenuClick}>
      {props.icon}
      {!iconify && <h4>{props.title}</h4>}
    </div>
  )
}

export default MenuItem
