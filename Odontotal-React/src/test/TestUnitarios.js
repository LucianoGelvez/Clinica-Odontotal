
    // Tests that fetchData function fetches data successfully from all URLs. 
    it("test_happy_path_fetch_data", async () => {
        const mockData = [{ id: 1, name: "John" }, { id: 2, name: "Jane" }];
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
        );
        const wrapper = mount(
            <ContextProvider>
                <ChildComponent />
            </ContextProvider>
        );
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
        expect(global.fetch).toHaveBeenCalledTimes(4);
        expect(global.fetch).toHaveBeenCalledWith("http://localhost:8080/odontologos");
        expect(global.fetch).toHaveBeenCalledWith("http://localhost:8080/pacientes");
        expect(global.fetch).toHaveBeenCalledWith("http://localhost:8080/protecistas");
        expect(global.fetch).toHaveBeenCalledWith("http://localhost:8080/turnos");
        expect(wrapper.find(ChildComponent).prop("information")).toEqual(mockData);
    });

    // Tests that children components are rendered with correct context values. 
    it("test_happy_path_render_children", () => {
        const wrapper = mount(
            <ContextProvider>
                <ChildComponent />
            </ContextProvider>
        );
        expect(wrapper.find(ChildComponent)).toHaveLength(1);
        expect(wrapper.find(ChildComponent).prop("information")).toEqual([]);
    });

    // Tests that fetchData function handles invalid URL correctly. 
    it("test_edge_case_invalid_url", async () => {
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.reject(new Error("Invalid URL"))
        );
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
        const wrapper = mount(
            <ContextProvider>
                <ChildComponent />
            </ContextProvider>
        );
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
        expect(global.fetch).toHaveBeenCalledTimes(4);
        expect(consoleSpy).toHaveBeenCalledWith(new Error("Invalid URL"));
        expect(wrapper.find(ChildComponent).prop("information")).toEqual([]);
        consoleSpy.mockRestore();
    });

    // Tests that ContextProvider function handles no children components provided. 
    it("test_edge_case_no_children", () => {
        const wrapper = mount(<ContextProvider />);
        expect(wrapper.find(ChildComponent)).toHaveLength(0);
    });

    // Tests that useEffect hook only runs once. 
    it("test_general_behavior_use_effect", async () => {
        const fetchDataSpy = jest.spyOn(ContextProvider.prototype, "fetchData");
        mount(
            <ContextProvider>
                <ChildComponent />
            </ContextProvider>
        );
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
        expect(fetchDataSpy).toHaveBeenCalledTimes(4);
        fetchDataSpy.mockRestore();
    });

    // Tests that useEffect hook handles invalid window location pathname. 
    it("test_edge_case_invalid_pathname", async () => {
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve([]),
            })
        );
        Object.defineProperty(window, "location", {
            value: { pathname: "/invalidPath" },
            writable: true,
        });
        const wrapper = mount(
            <ContextProvider>
                <ChildComponent />
            </ContextProvider>
        );
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });
        expect(global.fetch).not.toHaveBeenCalled();
        expect(wrapper.find(ChildComponent).prop("information")).toEqual([]);
    });