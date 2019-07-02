import { mockResponse } from 'mock-req-res'
import sinon from 'sinon'
import responses from '../../../src/api-responses'

describe('apiResponses', () => {
  
  context('ok with data', () => {
    let res
    let employee = { _id: 1, name: 'Arnaldo Pereira' }

    beforeEach(() => {
      res = mockResponse()
      responses(res).ok(employee)
    })

    it('should set http-status 200', () => {
      sinon.assert.calledOnce(res.status)
      sinon.assert.calledWith(res.status, 200)
    })

    it('should set response body', () => {
      sinon.assert.calledOnce(res.json)
      sinon.assert.calledWith(res.json, employee)
    })
  })

  context('ok without data', () => {
    let res

    beforeEach(() => {
      res = mockResponse()
      responses(res).ok()
    })

    it('should set http-status 200', () => {
      sinon.assert.calledOnce(res.status)
      sinon.assert.calledWith(res.status, 200)
    })
  })

  context('created', () => {
    let res
    let location = '/employees/1'

    beforeEach(() => {
      res = mockResponse()
      responses(res).created(location)
    })

    it('should set http-status 200', () => {
      sinon.assert.calledOnce(res.status)
      sinon.assert.calledWith(res.status, 201)
    })

    it('should set Location header', () => {
      sinon.assert.calledOnce(res.set)
      sinon.assert.calledWith(res.set, 'Location', '/employees/1')
    })
  })

  context('notFound', () => {
    let res

    beforeEach(() => {
      res = mockResponse()
      responses(res).notFound()
    })

    it('should set http status to 404', () => {
      sinon.assert.calledOnce(res.status)
      sinon.assert.calledWith(res.status, 404)
    })
  })

  context('badRequest', () => {
    let res

    beforeEach(() => {
      res = mockResponse()
      responses(res).badRequest()
    })

    it('should set http status to 400', () => {
      sinon.assert.calledOnce(res.status)
      sinon.assert.calledWith(res.status, 400)
    })
  })

  context('conflict', () => {
    let res

    beforeEach(() => {
      res = mockResponse()
      responses(res).conflict()
    })

    it('should set http status to 409', () => {
      sinon.assert.calledOnce(res.status)
      sinon.assert.calledWith(res.status, 409)
    })
  })

  context('internalServer', () => {
    let res

    beforeEach(() => {
      res = mockResponse()
      responses(res).internalServer()
    })

    it('should set http status to 500', () => {
      sinon.assert.calledOnce(res.status)
      sinon.assert.calledWith(res.status, 500)
    })
  })
})
