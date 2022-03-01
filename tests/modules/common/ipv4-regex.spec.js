const { IPV4_RGX } = require("../../../src/modules/common/util-regex");

describe("testing the regex for IPV4", () => {
  it.each`
    ipv4               | result
    ${"192.168.1.2"}   | ${true}
    ${"0.0.0.0"}       | ${true}
    ${"0-0-0-0"}       | ${false}
    ${"a.0.0.0"}       | ${false}
    ${"257.257.257.0"} | ${false}
    ${"0.0.0.0.0"}     | ${false}
    ${"0.0.0"}         | ${false}
  `("IPV4: $ipv4 is valid? $result", ({ ipv4, result }) => {
    expect(IPV4_RGX.test(ipv4)).toBe(result);
  });
});
