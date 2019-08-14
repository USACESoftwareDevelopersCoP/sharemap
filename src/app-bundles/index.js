import { 
  composeBundles,
  createCacheBundle,
} from 'redux-bundler';
import cache from '../utils/cache'

import routesBundle from './routes-bundle';
import drawBundle from './draw-bundle';

import { 
  createAuthBundle, 
  createOlMapBundle,
  createOlBasemapBundle
} from '@corpsmap/corpsmap-bundles';

export default composeBundles(
  routesBundle,
  createCacheBundle({
    cacheFn: cache.set
  }),
  createAuthBundle({
    appId: '0b217abf-bacd-424b-af3e-6b7f3f8beeab',
    token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjc0MzAzMDgxIiwicm9sZXMiOlsiUFVCTElDLlBVQkxJQyJdLCJhdWQiOlsiMGIyMTdhYmYtYmFjZC00MjRiLWFmM2UtNmI3ZjNmOGJlZWFiIl0sImlhdCI6MTU2NTcwODUwNywiZXhwIjoxNTY1Nzk0OTA3LCJuYW1lIjoiQlJFSVRLUkVVVFouV0lMSEVMTS5MRUUuIn0.S8u4rjmjIiTK1hw1Wysm9pDiu7j9tV9y3tYFoVt13L0JE2XOFLnch-bcJp17uvdgmSL2WiPInMBdOdcLB8uClLOm7cGOWYr6WbKxsTMyIl3ayenrF7hnSSFqnJKTEE8aFCGYdj-Qcc_ROziFkqV3rpC1rcBlqX6PLFjGzEfUEJi8NRjZ0jY_dLtDFdzSJYMk52yAG-trVUHzYk734DwH8AuhE1g_TViREyj0-3ft9FHCHEiLBU6jcSd0VY1K6EGPk0QfNJJbYCUJRpOHGSFuLzalf9VnimAmiZ6_suy4Eh7da-lmYXo53RarUc4ECzkrqbSX85zqybzsg87LKfM4JYHpuoQHAjVJusVwEDo60fPTGJDuHqgYSuLFYh3iTp_wrS6s7Rn5FGiY1Wzi4h60uxoKZDtUsvik2Hps7jdcOqhe88EkHZXz-ysdFf5CcxOPVaZLH0AqS8X6sMjnUh6jMJmlhFGanfdOqIcwLbwheSPcIjaLRsNvRVjsFt1NudD_mofctdZBRVOPapeU1G2N7yNjOZs0r1lDbIg1D3LPYqEPNYIxC-j89eMN4jA4WgDTi_52i5kfDKmFH0sNZCSvHp2SqaCmBVVcmIhGKKmKltpqqUi6B3cVxaheRR49ZAnPT1yTGULmJOcOlKDW66kVFKQaTm3nYBFhwgg07yhySgg'
  }),
  createOlMapBundle(),
  createOlBasemapBundle(),
  drawBundle
);