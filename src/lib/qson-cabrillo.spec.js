const { cabrilloToQSON } = require("./qson-cabrillo")
const fs = require("fs")
const path = require("path")

describe("cabrilloToQSON", () => {
  it("should work", () => {
    const iaru = fs.readFileSync(path.join(__dirname, "./samples/iaru-mixed.log"), "utf8", (err, data) => data)

    const qson = cabrilloToQSON(iaru)
    expect(qson.qsos.length).toEqual(518)
    expect(qson.qsos[0].start).toEqual("2021-07-10 12:07Z")
    expect(qson.qsos[0].freq).toEqual(7002)
    expect(qson.qsos[0].mode).toEqual("CW")
    expect(qson.qsos[0].our.call).toEqual("KI2D")
    expect(qson.qsos[0].our.rst).toEqual("599")
    expect(qson.qsos[0].our.ituZone).toEqual(8)
    expect(qson.qsos[0].their.call).toEqual("VE3MGY")
    expect(qson.qsos[0].their.rst).toEqual("599")
    expect(qson.qsos[0].their.ituZone).toEqual(4)
    expect(qson.refs[0].contest).toEqual("IARU-HF")
  })

  it("should work with non 599 exchanges", () => {
    const rtty = fs.readFileSync(path.join(__dirname, "./samples/naqp-rtty.log"), "utf8", (err, data) => data)

    const qson = cabrilloToQSON(rtty)
    expect(qson.qsos.length).toEqual(360)
    expect(qson.qsos[0].start).toEqual("2022-02-26 18:01Z")
    expect(qson.qsos[0].freq).toEqual(14087)
    expect(qson.qsos[0].mode).toEqual("RY")
    expect(qson.qsos[0].our.call).toEqual("KI2D")
    expect(qson.qsos[0].our.name).toEqual("DAN")
    expect(qson.qsos[0].our.state).toEqual("NY")
    expect(qson.qsos[0].their.call).toEqual("NJ4P")
    expect(qson.qsos[0].their.name).toEqual("ACE")
    expect(qson.qsos[0].their.state).toEqual("TN")
    expect(qson.refs[0].contest).toEqual("NAQP-RTTY")
  })

  it("should work with longer exchanges", () => {
    const sweeps = fs.readFileSync(path.join(__dirname, "./samples/arrlss-ssb.log"), "utf8", (err, data) => data)

    const qson = cabrilloToQSON(sweeps)
    expect(qson.qsos.length).toEqual(499)
    expect(qson.qsos[0].start).toEqual("2021-11-20 21:03Z")
    expect(qson.qsos[0].freq).toEqual(14329)
    expect(qson.qsos[0].mode).toEqual("PH")
    expect(qson.qsos[0].our.call).toEqual("KI2D")
    expect(qson.qsos[0].our.serial).toEqual(1)
    expect(qson.qsos[0].our.prec).toEqual("U")
    expect(qson.qsos[0].our.check).toEqual(20)
    expect(qson.qsos[0].our.section).toEqual("ENY")
    expect(qson.qsos[0].their.call).toEqual("KV0I")
    expect(qson.qsos[0].their.serial).toEqual(4)
    expect(qson.qsos[0].their.prec).toEqual("U")
    expect(qson.qsos[0].their.check).toEqual(61)
    expect(qson.qsos[0].their.section).toEqual("NE")
    expect(qson.refs[0].contest).toEqual("ARRL-SS-SSB")
  })
})
