
enum EProjectileType {
    /** An Instant projectile, it exists as a ray immediatley */
    Instant,
    /** Middleground between Instant and Projectile. Collides as a ray, but moves like a projectile */
    Ray,
    /** A collider which moves */
    Projectile
}

export default EProjectileType;