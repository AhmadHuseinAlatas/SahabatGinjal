import { DAILY_LIFE } from '../../data/dailyLife'
import Accent from '../ui/Accent'
import IconBadge from '../ui/IconBadge'
import SectionHeading from '../ui/SectionHeading'
import { Stagger, StaggerItem } from '../ui/Stagger'

export default function DailyLife() {
  return (
    <section id="harian" aria-labelledby="judul-harian" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="judul-harian"
          number="11"
          kicker="Di antara jadwal"
          title={
            <>
              Hidup tetap <Accent tone="leaf">milikmu</Accent>
            </>
          }
          description="Enam hal yang paling sering ditanyakan tentang hari-hari biasa. Angka pastinya berbeda untuk setiap orang: ini peta, bukan resep."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DAILY_LIFE.map((item) => (
            <StaggerItem
              key={item.id}
              as="article"
              className="card p-7 transition-transform duration-500 ease-soft hover:-translate-y-1"
            >
              <IconBadge icon={item.icon} tone={item.tone} />
              <h3 className="mt-5 font-display text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
