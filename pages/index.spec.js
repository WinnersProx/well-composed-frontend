import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import { FETCH_POST, FETCH_POSTS } from '../store/action-types';

import PageIndex from './index.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe(`PageIndex`, () => {
  let modules;
  let store;

  beforeEach(() => {
    modules = {
      post: {
        namespaced: true,
        actions: {
          FETCH_POST: jest.fn(),
        },
        state: {
          posts: [],
          current: {
            title: `Title`,
            body: `Body`,
          },
        },
      },
    };

    store = new Vuex.Store({
      state: { },
      modules,
    });
  });

  test(`It should render a \`<div>\`.`, () => {
    const wrapper = shallowMount(PageIndex, { store, localVue });

    expect(wrapper.is(`div`)).toBe(true);
  });

  test(`It should fetch data from the store.`, () => {
    const wrapper = shallowMount(PageIndex, { store, localVue });
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    wrapper.vm.$options.fetch({ store });

    expect(mockDispatch).toBeCalledWith(`post/${FETCH_POSTS}`);
    expect(mockDispatch).toBeCalledWith(`post/${FETCH_POST}`, 1);
  });
});
