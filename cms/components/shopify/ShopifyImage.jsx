import cx from 'classnames'
import React, { useEffect, useState, useCallback } from 'react'
import {CogIcon, CloseIcon } from '@sanity/icons'
import {set, unset} from 'sanity'
import { Stack, Flex, Card, TextInput, Button } from '@sanity/ui'
import ShopifyIcon from '../icons/Shopify'

export const ShopifyImage = (props) => {
  const [localValue, setLocalValue] = useState(props.value)
  const [uploading, setUploading] = useState(false)
  const {elementProps, onChange, value = ''} = props
  const handleChange = (event) => {
    const formData = new FormData()
    setUploading(true)
    formData.append('file', event.target.files[0])
      fetch('/api/stage-files', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          onChange([
            set(json.data.image.url, ['url']),
            set(json.data.image.height, ['height']),
            set(json.data.image.width, ['width']),
            set(json.data.image.fileGid, ['fileGid'])
          ])
          setUploading(false)
        }
        // setImageValue(json.data.image.url)

      })
  }
  const handleAlt = useCallback((event) => {
    const nextValue = event.currentTarget.value
    onChange(set(nextValue, ['altText']))
	}, [onChange, localValue])

  const handleRemoveAsset = useCallback(() => {
    onChange(unset())
  })

  return (
    <Stack>
      {value.url ? (
        <>
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <ShopifyIcon /> <span style={{ display: 'block', marginLeft: '6px', fontSize: '13px' }}>Images Powered by Shopify:</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px'
            }}>
              <Button onClick={handleRemoveAsset} icon={CloseIcon} type='reset' tone='critical' padding={[3, 3, 3]} fontSize={[ 2,2,2]} />
            </div>
            <Flex padding={3}>
              {value.url && (
                <Card flex={2}>
                  <img style={{
                    width: '250px',
                    height: 'auto',
                  }} src={value.url} />
                </Card>
              )}
              <Card flex={2} margin={[0, 0]}>
                <label style={{ marginBottom: '6px', fontSize: '11px', display: 'block' }} htmlFor="alt-text">Alt Text</label>
                <TextInput
                  id='alt-text'
                  {...elementProps}
                  onChange={handleAlt}
                  value={value.altText}
                />
                <label style={{ margin: '10px 0', fontSize: '11px', display: 'block' }} htmlFor="height">Height</label>
                <TextInput
                  id='height'
                  disabled
                  value={value.height}
                />
                <label style={{ margin: '10px 0', fontSize: '11px', display: 'block' }} htmlFor="width">Width</label>
                <TextInput
                  id='width'
                  disabled
                  value={value.width}
                />
              </Card>
            </Flex>
          </div>
        </>
      ) : (
        <>
          <style>{`
            .shopify-upload {
              border: 1px solid currentColor;
              padding: 18px 12px;
              border-radius: 6px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 13px;
              text-align: center;
              cursor: pointer;
              transition: all 0.3s ease-in-out;
            }
            .shopify-upload:hover {
              background-color: rgba(255,255,255,0.6);
              color: black;
            }
            .shopify-upload.uploading {
              opacity: 0.9;
              box-shadow: 0 0 0 0 rgba(255, 121, 63, 1);
              animation: pulse-orange 2s infinite;
              color: white;
            }
            @keyframes pulse-orange {
              0% {
                box-shadow: 0 0 0 0 rgba(255, 121, 63, 0.7);
              }
              
              70% {
                box-shadow: 0 0 0 18px rgba(255, 121, 63, 0);
              }
              
              100% {
                box-shadow: 0 0 0 0 rgba(255, 121, 63, 0);
              }
            }
          `}</style>
          <label className={cx('shopify-upload', {
            'uploading': uploading
          })}>
            <input style={{ display: 'none' }} onChange={handleChange} type='file' name='shopify.asset' id='file_to_upload' />
            <ShopifyIcon /> <span style={{ marginLeft: '8px', display: 'inline-block' }}>{uploading ? 'File Uploading... this might take a second' : 'Upload File to Shopify'}</span>
          </label>
        </>
      )}
    </Stack>
  )
}