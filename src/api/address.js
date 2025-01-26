import request from '@/utils/request'

export const fetchAddressList = () => {
  return request({
    url: '/address/list'
  })
}

export const fetchDefaultAddressId = () => {
  return request({
    url: '/address/defaultId'
  })
}

export const fetchRegionList = () => {
  return request({
    url: '/region/tree'
  })
}

export const fetchAddressDetail = (addressId) => {
  return request({
    url: '/address/detail',
    params: {
      addressId
    }
  })
}

export const addAddress = ({ name, phone, detail, region }) => {
  return request({
    url: '/address/add',
    method: 'post',
    data: {
      form: {
        name,
        phone,
        detail,
        region
      }
    }
  })
}

export const updateAddress = ({ name, phone, detail, region, addressId }) => {
  return request({
    url: '/address/edit',
    method: 'post',
    data: {
      addressId,
      form: {
        name,
        phone,
        detail,
        region
      }
    }
  })
}

export const deleteAddress = addressId => {
  return request({
    url: '/address/remove',
    method: 'post',
    data: {
      addressId
    }
  })
}

export const setDefaultAddress = addressId => {
  return request({
    url: '/address/setDefault',
    method: 'post',
    data: {
      addressId
    }
  })
}
