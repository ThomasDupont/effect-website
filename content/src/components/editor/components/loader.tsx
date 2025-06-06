import { useRxValue } from "@effect-rx/rx-react"
import { motion, AnimatePresence } from "framer-motion"
import { CircleCheck, Loader2 } from "lucide-react"
import { isLoadedRx } from "../rx/loader"
import { loaderStepsRx } from "../services/loader"

export function PlaygroundLoader() {
  const isReady = useRxValue(isLoadedRx)
  const steps = useRxValue(loaderStepsRx, (steps) => {
    return steps.every((step) => step.done) ? steps : steps.slice(0, steps.findIndex((step) => !step.done) + 1)
  })
  return (
    <AnimatePresence initial={false}>
      {!isReady && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-[--sl-color-bg] flex items-center justify-center"
        >
          <div className="w-full flex max-w-md px-4 pb-8 pt-4 md:pt-8 rounded-sm bg-[--sl-color-bg-nav] text-[sl-color-text] shadow-lg">
            <div className="m-auto flex flex-col justify-center">
              <h2 className="!text-2xl font-bold mb-6 text-center !text-[--sl-color-text-accent]">
                Loading the Effect Playground
              </h2>
              <div className="flex flex-col space-y-4">
                <AnimatePresence initial={false}>
                  {steps.map((step) => {
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full max-w-[280px] flex items-center space-x-3"
                      >
                        <motion.div
                          className="flex"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                        >
                          {step.done ? (
                            <CircleCheck className="w-6 h-6 text-green-500" />
                          ) : (
                            <Loader2 className="w-6 h-6 text-[--sl-color-text] animate-spin" />
                          )}
                        </motion.div>
                        <span className={step.done ? "text-[--sl-color-text]" : "text-[--sl-color-white]"}>
                          {step.message}
                        </span>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
