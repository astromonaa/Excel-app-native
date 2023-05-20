import { Page } from "../core/Page";
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { ToolBar } from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import { createStore } from '@core/createStore'
import { rootReducer } from '@/redux/rootReducer'
import { storage, debounce } from '@core/utils'
import { normalizeInitialState } from '@/redux/initialState'

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params || Date.now().toString()

    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state));
    
    const stateListener = debounce((state) => {
      storage(storageName(params), state);
    }, 500);

    store.subscribe(stateListener);

    this.excel = new Excel({
        components: [Header, ToolBar, Formula, Table],
        store,
      })
    
    return this.excel.getRoot()
  }
  afterRender() {
    this.excel.init()
  }
  destroy() {
    this.excel.destroy()
  }
}
