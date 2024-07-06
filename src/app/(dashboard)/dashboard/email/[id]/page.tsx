import React from 'react'
import { Mail } from '~/components/mail/data'
import { MailDisplay } from '~/components/mail/mail-display'

export default function OpenMail({id, mails}: {id: string, mails: Mail[]}) {
  const mail = mails.find(mail => mail.id === id) || null

  return (
    <MailDisplay mail={mail} />
  )
}