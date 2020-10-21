const { Reservation, ReservationLists} = require("./model");
describe("Reservation", () => {
    describe("Initialization", () => {
        it("should throw an error if it has any missing parameters", () => {
            const cb = () => {
                const r = new Reservation();
            }
            expect(cb).toThrow();
        })
    })
})
describe("ReservationLists", () => {
    describe("addReservation", () => {
        it("should take reservations", async () => {
            const rl = new ReservationLists(5);
            const r = new Reservation("eric", "test@asdf.com", 1, "555-555-5555");
            const result = await rl.addReservation(r);
            expect(result).toBe(true);
        })
        it("should not take things are which not reservation", () => {
            expect.hasAssertions();
            expect.assertions(1);
            const rl = new ReservationLists(5);
            const mock = jest.spyOn(rl, "save");
                rl.addReservation(4)
                    .then(() => {
                        console.log("all good")
                    })
                    .catch(err => {
                        expect(err).toBeTruthy();
                    })
            mock.mockRestore();
        })
    })
})