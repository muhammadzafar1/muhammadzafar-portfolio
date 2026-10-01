import { useState } from 'react'
import services from '../data/services'
import ServiceCard from './ServiceCard'
import ServiceModal from './ServiceModal'

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <section id="services" className="w-full scroll-mt-20 bg-[#f6f7fb] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 text-center sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#6d5ef8] sm:text-sm">// What I Do</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-5xl">Services</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              onOpen={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <ServiceModal
          services={services}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
        />
      )}
    </section>
  )
}
