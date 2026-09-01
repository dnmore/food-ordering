

const pillars = [
    {
        title: "Your brand",
        description: "A customer experience that represents your restaurant."
    },
    {
        title: "Your customers",
        description:"A direct channel between your restaurant and customers."
    },
    {
        title:"Your data",
        description:"Business insights you can actually use."
    }
]

export function OwnBusiness(){
    return(
         <section className="flex w-full flex-col items-center justify-center text-center gap-8 px-4 py-12 md:px-8">
<h2 className="text-2xl font-bold md:text-4xl">
        Own Your Business
      </h2>
      <p className="text-muted-foreground">Cravewaves puts your ordering experience, menus, orders, and business data in your hands.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-4 p-4">
{pillars.map(({title, description})=>(
    <div key={title} className="flex w-full flex-col gap-4">
         <p className="text-xl font-bold">{title}</p>
            <p className="text-sm">{description}</p>
    </div>
))}
      </div>
         </section>
    )
}