import React from 'react'

type NoticeProps = {
  type?: string
}
export const Notice: React.FC<NoticeProps> = ({ children, type = 'info' }) => {
  return (
    <>
      <div className={'notices ' + type}>{children}</div>
    </>
  )
}
