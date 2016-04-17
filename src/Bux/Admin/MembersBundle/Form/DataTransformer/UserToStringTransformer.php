<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/5/15
 * Time: 10:18 AM
 */

namespace Bux\Admin\MembersBundle\Form\DataTransformer;

use Bux\UserBundle\Entity\User;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class UserToStringTransformer
 *
 * @package Bux\Admin\MembersBundle\Form\DataTransformer
 */
class UserToStringTransformer implements DataTransformerInterface
{
    /**
     * @var ObjectManager
     */
    private $om;

    /**
     * @param ObjectManager $om
     */
    public function __construct(ObjectManager $om)
    {
        $this->om = $om;
    }

    /**
     * @param User $user
     *
     * @return mixed|string
     *
     * Transforms an object (user) to a string (username).
     */
    public function transform($user)
    {

        if (null === $user) {
            return "";
        }

        return $user->getUsername();
    }

    /**
     * Transforms a string (username) to an object (user).
     * @param string $username
     *
     * @return User|mixed|null
     *
     *
     */
    public function reverseTransform($username)
    {
        if (!$username) {
            return null;
        }

        $user = $this->om->getRepository('BuxUserBundle:User')->findOneBy(array(
            'username' => $username
        ));

        if (null === $user) {
            throw new TransformationFailedException(sprintf(
                'An user with username "%s" does not exist!',
                $username
            ));
        }

        return $user;
    }
}