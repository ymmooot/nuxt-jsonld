import plugin from '../src/runtime/plugin-impl';

let useHeadArg = undefined;
vi.mock('@unhead/vue', () => ({
  useHead: vi.fn().mockImplementation((arg) => {
    useHeadArg = arg;
  }),
}));

describe('plugin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useHeadArg = undefined;
  });

  const getUseHeadArg = (jsonld) => {
    // install the plugin
    let installFunction;
    const nuxtApp = {
      vueApp: {
        use: vi.fn().mockImplementation((arg) => {
          installFunction = arg.install;
        }),
      },
    };
    plugin(nuxtApp);
    expect(nuxtApp.vueApp.use).toBeCalledTimes(1);
    let created;
    const vueMock = {
      mixin: vi.fn().mockImplementation((arg) => {
        created = arg.created;
      }),
    };
    installFunction(vueMock);

    // mixin is set
    expect(vueMock.mixin).toBeCalled();

    created.call({
      $options: {
        jsonld,
      },
    });
    return useHeadArg;
  };

  it('does not call useHead when $jsonld is not set', () => {
    const useHeadArg = getUseHeadArg(undefined);
    expect(useHeadArg).toEqual(undefined);
  });

  it('calls useHead', () => {
    const useHeadArg = getUseHeadArg(() => ({
      foo: 'bar',
    }));
    const json = useHeadArg();
    expect(json).toEqual({ script: [{ children: '{"foo":"bar"}', type: 'application/ld+json' }] });
  });
});
