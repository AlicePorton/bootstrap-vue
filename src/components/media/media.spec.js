import Media from './media'
import { mount } from '@vue/test-utils'

describe('media', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(Media)

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('media')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.media-body').length).toBe(1)
    expect(wrapper.findAll('.d-flex').length).toBe(0)
    expect(wrapper.text()).toEqual('')
    // Should have only one child element
    expect(wrapper.findAll('.media > *').length).toBe(1)
  })

  it('renders custom root element when tag prop set', async () => {
    const wrapper = mount(Media, {
      propsData: {
        tag: 'section'
      }
    })

    expect(wrapper.is('section')).toBe(true)
    expect(wrapper.classes()).toContain('media')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has expected structure when slot aside present', async () => {
    const wrapper = mount(Media, {
      slots: {
        aside: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('media')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.media-body').length).toBe(1)
    expect(wrapper.findAll('.d-flex').length).toBe(1)
    // Should have only two child elements
    expect(wrapper.findAll('.media > *').length).toBe(2)
    // Has expected child order
    expect(wrapper.find('.media > .d-flex + .media-body').exists()).toBe(true)
    expect(wrapper.find('.media > .media-body + .d-flex').exists()).toBe(false)
    // Aside has extra classes
    expect(wrapper.find('.d-flex').classes()).toContain('mr-3')
  })

  it('has expected structure when prop right-align is set and slot aside present', async () => {
    const wrapper = mount(Media, {
      propsData: {
        rightAlign: true
      },
      slots: {
        aside: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('media')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.media-body').length).toBe(1)
    expect(wrapper.findAll('.d-flex').length).toBe(1)
    // Should have only two child elements
    expect(wrapper.findAll('.media > *').length).toBe(2)
    // Has expected child order
    expect(wrapper.find('.media > .media-body + .d-flex').exists()).toBe(true)
    expect(wrapper.find('.media > .d-flex + .media-body').exists()).toBe(false)
    // Aside has extra classes
    expect(wrapper.find('.d-flex').classes()).toContain('ml-3')
  })

  it('places default slot inside media-body', async () => {
    const wrapper = mount(Media, {
      slots: {
        default: '<b>foobar</b>'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('media')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.media-body').length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
    expect(wrapper.find('.media-body').text()).toEqual('foobar')
  })

  it('does not have child media-body is prop no-body set', async () => {
    const wrapper = mount(Media, {
      propsData: {
        noBody: true
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('media')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.media-body').length).toBe(0)
    expect(wrapper.text()).toEqual('')
    // Should have no child elements
    expect(wrapper.findAll('.media > *').length).toBe(0)
  })

  it('places default slot inside self when no-body set', async () => {
    const wrapper = mount(Media, {
      propsData: {
        noBody: true
      },
      slots: {
        default: '<b>foobar</b>'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('media')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.media-body').length).toBe(0)
    expect(wrapper.text()).toEqual('foobar')
  })

  it('sets vertialAlign prop on media-aside child', async () => {
    const wrapper = mount(Media, {
      propsData: {
        verticalAlign: 'bottom'
      },
      slots: {
        aside: 'foobar'
      }
    })

    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('media')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.findAll('.media-body').length).toBe(1)
    expect(wrapper.findAll('.d-flex').length).toBe(1)
    expect(wrapper.text()).toEqual('foobar')
    // Should have only two child elements
    expect(wrapper.findAll('.media > *').length).toBe(2)
    // Should have media aside with self align bottom
    expect(wrapper.find('.d-flex').classes()).toContain('align-self-bottom')
    // Should have content in aside
    expect(wrapper.find('.d-flex').text()).toEqual('foobar')
  })
})
