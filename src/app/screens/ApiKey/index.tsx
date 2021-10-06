import React, { useState } from 'react'
import { Container, Input, Button } from '../../components'
import { useNotifyContext, useAuthContext } from '../../../providers'
import './index.css'

const ApiKey: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('')
  const { notify } = useNotifyContext()
  const { setPersistentApiKey } = useAuthContext()

  const saveApiKey = (): void => {
    if (apiKey.length === 32) {
      setPersistentApiKey(apiKey)
    } else { notify('API key inválida', 'error') }
  }

  return (
        <Container id='ApiKey'>
            <Input
                value={apiKey}
                setValue={setApiKey}
                onEnter={saveApiKey}
                label='API key'
                className='apiKeyInput'
            />
            <Button className='apiKeyButton' onClick={saveApiKey}>Salvar API key</Button>
        </Container>
  )
}

export default ApiKey
