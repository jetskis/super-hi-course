'use client'

import React, {Fragment} from 'react'
import {NextStudio} from 'next-sanity/studio'
import config from '../../sanity.config'

export default function StudioPage() {
	return <NextStudio config={config} />
}
