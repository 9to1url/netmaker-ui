import { produce } from 'immer'
import { createReducer } from 'typesafe-actions'
import { ExternalClient } from '~store/types'
import { createEgressNode, createIngressNode, createRelayNode, deleteEgressNode, deleteIngressNode, deleteNode, deleteRelayNode, getExternalClientConf, getExternalClients, getNodes, updateNode } from './actions'
import { Node } from './types'
import { download, nodePayloadToNode } from './utils'

export const reducer = createReducer({
  nodes: [] as Array<Node>,
  isFetching: false as boolean,
  externalClients: [] as Array<ExternalClient>,
  isFetchingClients: false as boolean,
})
  .handleAction(getNodes['request'], (state, _) =>
    produce(state, (draftState) => {
      draftState.isFetching = true
    })
  )
  .handleAction(getExternalClients['request'], (state, _) =>
    produce(state, (draftState) => {
      draftState.isFetchingClients = true
    })
  )
  .handleAction(getNodes['success'], (state, action) =>
    produce(state, (draftState) => {
      draftState.nodes = action.payload.map(nodePayloadToNode)
      draftState.isFetching = false
    })
  )
  .handleAction(getExternalClients['success'], (state, action) => 
    produce(state, (draftState) => {
      draftState.externalClients = action.payload || []
      draftState.isFetchingClients = false
    })
  )
  .handleAction(getNodes['failure'], (state, _) =>
    produce(state, (draftState) => {
      draftState.nodes = []
      draftState.isFetching = false
    })
  )
  .handleAction(updateNode['success'], (state, action) => 
    produce(state, (draftState) => {
      const index = draftState.nodes.findIndex(
        node => node.id === action.payload.id
      )
      if (~index) {
        draftState.nodes[index] = nodePayloadToNode(action.payload)
      }
    })
  )
  .handleAction(deleteNode['success'], (state, action) => 
    produce(state, (draftState) => {
      const index = draftState.nodes.findIndex(
        node => node.id === action.payload.nodeid
      )
      if (~index) {
        draftState.nodes = draftState.nodes.filter(node => node.id !== action.payload.nodeid)
      }
    })
  )
  .handleAction(createEgressNode['success'], (state, action) => 
    produce(state, (draftState) => {
      const index = draftState.nodes.findIndex(
        node => node.id === action.payload.id
      )
      if (~index) {
        draftState.nodes[index] = nodePayloadToNode(action.payload)
      }
    })
  )
  .handleAction(deleteEgressNode['success'], (state, action) => 
    produce(state, (draftState) => {
      const index = draftState.nodes.findIndex(
        node => node.id === action.payload.id
      )
      if (~index) {
        draftState.nodes[index] = nodePayloadToNode(action.payload)
      }
    })
  )
  .handleAction(createIngressNode['success'], (state, action) => 
    produce(state, (draftState) => {
      const index = draftState.nodes.findIndex(
        node => node.id === action.payload.id
      )
      if (~index) {
        draftState.nodes[index] = nodePayloadToNode(action.payload)
      }
    })
  )
  .handleAction(deleteIngressNode['success'], (state, action) =>
    produce(state, (draftState) => {
      const index = draftState.nodes.findIndex(
        node => node.id === action.payload.id
      )
      if (~index) {
        draftState.nodes[index] = nodePayloadToNode(action.payload)
      }
    })
  )
  .handleAction(createRelayNode['success'], (state, action) =>
    produce(state, (draftState) => {
      const index = draftState.nodes.findIndex(
        node => node.id === action.payload.id
      )
      if (~index) {
        draftState.nodes[index] = nodePayloadToNode(action.payload)
      }
    })
  )
  .handleAction(deleteRelayNode['success'], (state, action) =>
    produce(state, (draftState) => {
      const index = draftState.nodes.findIndex(
        node => node.id === action.payload.id
      )
      if (~index) {
        draftState.nodes[index] = nodePayloadToNode(action.payload)
      }
    })
  )
  .handleAction(getExternalClients['failure'], (state, _) => 
    produce(state, (draftState) => {
      draftState.externalClients = []
      draftState.isFetchingClients = false
    })
  )
  .handleAction(getExternalClientConf['success'], (state, action) => 
    produce(state, (draftState) => {
      if (action.payload.type === 'file') {
        download(`${action.payload.filename}.conf`, action.payload.data)
      } else {
        console.log('handle QR..')
      }
    })
  )
  
