import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Input = styled.input`
padding: 0.5em;
margin: 0.5em;
color: ${props => props.inputColor || 'palevioletred'};
background: papayawhip;
border: none;
border-radius: 3px;
`

export const Page = styled.div`
  padding: 1.5em;
  background: #ffce74;
`

export const Navigation = styled.div`
  background: #ffaf74;
  padding: 2em;
`

export const Head = styled.h2`
  color: 
`

export const Footerz = styled.div`
  background: AC4900;
  padding: 1em;
  margin-top: 3em;
`

export const LogoutButton = styled.button`
  background: #bd3d62;
  margin: 1px;
  padding: 0.25em 0.75em;
  color: black;

`

export const CreateButton = styled.button`
  background: #B3EA89;
  margin: 1px;
  padding: 0.25em 1.25em;
  color: black;
`

export const CancelButton = styled.button`
  background: #EB7768;
  margin: 1px;
  padding: 0.25em 0.25em;
  color: black;
`

export const BCreateButton = styled.button`
  background: #71C687;
  margin 1px;
  padding: 0.25em 0.25em;
  color: black;
`

export const AnotherButton = styled.button`
background: #0A95FF;
margin 1px;
padding: 0.25em 0.25em;
color: black;
`

export const LinkLink = styled(Link)`
  color: #000000;
`


export const FinalButton = styled.button`
  background: #17FF54;
  margin 3px;
  font-size: 2em;
  padding 5em 10em;
  color: black;
`

export const InnerContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`



